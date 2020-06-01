from rest_framework import generics, mixins
from home.models import Author, Book, Genre
from home.serializers import AuthorSerializer, BookSerializer, GenreSerializer


class AuthorListView(generics.ListAPIView):

    serializer_class = AuthorSerializer
    queryset = Author.objects.all()


class BookListView(mixins.ListModelMixin,
                   mixins.CreateModelMixin,
                   generics.GenericAPIView):

    serializer_class = BookSerializer
    queryset = Book.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class GenreListView(generics.ListAPIView):

    serializer_class = GenreSerializer
    queryset = Genre.objects.all()
