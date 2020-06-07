from rest_framework import generics, mixins, status
from rest_framework.response import Response
from home.models import Author, Book, Genre
from home.serializers import AuthorSerializer, BookSerializer, GenreSerializer


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

    def post(self, request):
        print(request.data)
        print(request.data['genres'])
        print(request.data['authorsFirstname'])
        print(request.data['authorsLastname'])
        print(request.data['name'])
        print(request.data['userToken'])
        try:
            new_genre = Genre.objects.create(genre=request.data['genres'])
            new_author = Author.objects.create(
                first_name=request.data['authorsFirstname'], last_name=request.data['authorsLastname'])
            new_book = Book.objects.create(name=request.data['name'])
            new_book.authors.add(new_author)
            new_book.genres.add(new_genre)
            new_genre.save()
            new_author.save()
            new_book.save()
            return Response([], status=status.HTTP_200_OK)
        except:
            print(e)
            return Response([], status=status.HTTP_400_BAD_REQUEST)


class GenreListView(generics.ListAPIView):

    serializer_class = GenreSerializer
    queryset = Genre.objects.all()
