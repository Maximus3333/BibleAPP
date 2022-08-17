from attr import field, fields
from rest_framework import serializers

from .models import Book, Chapter, Verse

class VerseSerializer(serializers.ModelSerializer):
    chapter = serializers.IntegerField(source='chapter.chapter', read_only=True)
    book = serializers.CharField(source='book.book_title', read_only=True)

    class Meta:
        model = Verse
        fields = '__all__'

class ChapterSerializer(serializers.ModelSerializer):
    verses = VerseSerializer(many=True, read_only=True)

    class Meta:
        model = Chapter
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    # chapters = ChapterSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ['book_title']