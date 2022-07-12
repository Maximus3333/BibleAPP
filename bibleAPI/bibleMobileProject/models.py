from pyexpat import model
from tkinter import CASCADE
from django.db import models
from matplotlib.pyplot import text, title

# class Bible(models.Model):
   
#     bible_title = models.CharField(max_length=50)
#     cover_image = models.ImageField(upload_to='img', blank=True, null=True)
#     pdf = models.FileField(upload_to='pdf')


#     def __str__(self):
#         return self.bible_title


default_bible = 'King James Version'
default_bible_id = 1
class Bible(models.Model):
   
    bible_title = models.CharField(max_length=50, default=default_bible, editable=False, unique = True)
    # chapters = models.IntegerField()

class Book(models.Model):

    # book_id = models.AutoField(primary_key=True)
    bible = models.ForeignKey(Bible, default=default_bible_id, on_delete=models.CASCADE)
    book_title = models.CharField(max_length=50, unique = True)
    old_or_new_testament = models.CharField(max_length=20)

    # chapters = models.IntegerField()
    def __str__(self):
        return f'{self.bible}, Title: {self.book_title}, Testament: {self.old_or_new_testament}' 
        # self.bible + "" + self.book_title + "" + self.old_or_new_testament

class Chapter(models.Model):

    book = models.ForeignKey(Book, related_name='chapters', on_delete=models.CASCADE)
    chapter = models.IntegerField()
    # verses = models.IntegerField()

    def __str__(self):
        return f'Book: {self.book}, Chapter: {self.chapter}' 


class Verse(models.Model):

    # book = models.ForeignKey(Book, related_name='verses', on_delete=models.CASCADE)
    chapter = models.ForeignKey(Chapter, related_name='verses', on_delete=models.CASCADE)
    verse = models.IntegerField()
    text = models.TextField()

    def __str__(self):
        return f'Chapter: {self.chapter}:{self.verse}' 

        return self.chapter + "" + self.verse + "" + self.text


# Create your models here.
