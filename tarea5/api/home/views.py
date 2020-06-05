from rest_framework import generics, mixins
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


class GenreListView(generics.ListAPIView):

    serializer_class = GenreSerializer
    queryset = Genre.objects.all()
