# Generated by Django 4.2.4 on 2023-08-24 02:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_rename_packages_order_packages_dict'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='notes',
            field=models.CharField(default='', max_length=500),
            preserve_default=False,
        ),
    ]
