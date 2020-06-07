from rest_framework import generics, mixins, views, viewsets
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

    def get(self, request):
        queryset = Book.objects.all()
        name = request.GET.get('name', None)
        if name:
            queryset = queryset.filter(name__icontains=name)
        serializer = BookSerializer(queryset, many=True)
        return Response(serializer.data)


class GenreListView(generics.ListAPIView):

    serializer_class = GenreSerializer
    queryset = Genre.objects.all()


class AuthTokenView(viewsets.GenericViewSet):
    serializer_class = AuthTokenSerializer

    def get_permissions(self):
        permission_classes = (IsAuthenticated, )
        if self.action == 'get_or_create':
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    @action(detail=True, methods=['post'])
    def get_or_create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})

    def destroy(self, request, *args, **kwargs):
        request.auth.delete()
        return Response({'detail': 'Token successfully deleted.'})


class CurrentUserView(views.APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
