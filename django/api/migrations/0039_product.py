# Generated by Django 4.2.4 on 2023-11-15 01:11

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0038_order_item_type_dict_hash_alter_order_order_number"),
    ]

    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("item_name", models.CharField(max_length=100)),
            ],
            options={
                "verbose_name_plural": "Products",
            },
        ),
    ]
