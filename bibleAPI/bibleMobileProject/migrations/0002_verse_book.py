# Generated by Django 3.0.7 on 2022-07-12 22:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bibleMobileProject', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='verse',
            name='book',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='verses', to='bibleMobileProject.Book'),
        ),
    ]
