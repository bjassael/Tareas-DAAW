from rest_framework import generics, mixins
from home.models import Book
from home.serializers import BookSerializer


# class BookListView(generics.ListAPIView):

#     serializer_class = BookSerializer
#     queryset = Book.objects.all()


class BookListView(mixins.ListModelMixin,
                   mixins.CreateModelMixin,
                   generics.GenericAPIView):

    serializer_class = BookSerializer
    queryset = Book.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        print(request.data)
        return self.create(request, *args, **kwargs)
