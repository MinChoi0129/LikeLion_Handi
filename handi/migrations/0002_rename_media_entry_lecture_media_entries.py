# Generated by Django 4.2.4 on 2023-08-11 07:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('handi', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='lecture',
            old_name='media_entry',
            new_name='media_entries',
        ),
    ]
