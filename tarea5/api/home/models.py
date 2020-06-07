from django.db import models
from django.contrib.auth.models import User


class Genre(models.Model):
  genre = models.CharField(max_length=255)

  def __str__(self):
    return self.genre

class Author(models.Model):
  first_name = models.CharField(max_length=255)
  last_name = models.CharField(max_length=255)

  def __str__(self):
    return f'{self.first_name} {self.last_name}'


class Book(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  name = models.CharField(max_length=255)
  authors = models.ManyToManyField(Author)
  genres = models.ManyToManyField(Genre)

  class Meta:
    ordering = ['name']

  def __str__(self):
    return self.name
