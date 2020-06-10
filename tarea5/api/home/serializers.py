from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Author, Book, Genre


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['first_name', 'last_name']


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['genre']


class BookSerializer(serializers.ModelSerializer):

    authors = AuthorSerializer(read_only=True, many=True)
    genres = GenreSerializer(read_only=True, many=True)

    class Meta:
        model = Book
        fields = ['name', 'authors', 'genres']


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name')
        read_only_fields = ('username', 'password')
