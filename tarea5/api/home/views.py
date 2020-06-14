from rest_framework import generics, mixins, views, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from home.models import Author, Book, Genre
from home.serializers import AuthorSerializer, BookSerializer, GenreSerializer, UserSerializer


class AuthorListView(generics.ListAPIView):

    serializer_class = AuthorSerializer
    queryset = Author.objects.all()


class BookListView(generics.GenericAPIView):

    serializer_class = BookSerializer
    queryset = Book.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Book.objects.filter(user=user)

    def get(self, request):
        queryset = self.get_queryset()
        name = request.GET.get('name', None)
        if name:
            queryset = queryset.filter(name__icontains=name)
        serializer = BookSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        print(request.data)
        try:
            new_genre = Genre.objects.create(genre=request.data['genres'])
            new_author = Author.objects.create(
                first_name=request.data['authorsFirstname'],
                last_name=request.data['authorsLastname'])
            new_genre.save()
            new_author.save()
            # Create book
            new_book = Book.objects.create(
                user=request.user,
                name=request.data['name'])
            new_book.save()
            # Add ManyToMany relations
            new_book.authors.add(new_author)
            new_book.genres.add(new_genre)
            return Response([], status=status.HTTP_200_OK)
        except:
            return Response([], status=status.HTTP_400_BAD_REQUEST)


class GenreListView(generics.ListAPIView):

    serializer_class = GenreSerializer
    queryset = Genre.objects.all()


class AuthTokenView(viewsets.GenericViewSet):
    serializer_class = AuthTokenSerializer
    print(5)

    def get_permissions(self):
        permission_classes = (IsAuthenticated, )
        if self.action == 'get_or_create':
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    @action(detail=True, methods=['post'])
    def get_or_create(self, request, *args, **kwargs):
        print(1)
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        print(2)
        serializer.is_valid(raise_exception=True)
        print(3)
        user = serializer.validated_data['user']
        print(4)
        token, created = Token.objects.get_or_create(user=user)
        print(5)
        return Response({'token': token.key})

    def destroy(self, request, *args, **kwargs):
        request.auth.delete()
        return Response({'detail': 'Token successfully deleted.'})


class CurrentUserView(views.APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
