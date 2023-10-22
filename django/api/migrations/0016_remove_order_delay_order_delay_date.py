# Generated by Django 4.2.4 on 2023-09-06 22:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_order_delay'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='delay',
        ),
        migrations.AddField(
            model_name='order',
            name='delay_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
