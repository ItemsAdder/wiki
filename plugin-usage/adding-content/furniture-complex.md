---
icon: wand-magic-sparkles
---

# Furniture - complex


<Warning>
### Requires **ItemsAdder 4.0.9** or greater.
</Warning>


To create advanced furniture you have to use the custom entities feature of ItemsAdder.\
Please read the tutorial on how to create custom entities before:


<Card title="mobs" icon="text" href="/mobs/">
mobs
</Card>



<Warning>
Custom entities were developed with performance in mind, but they might cause high CPU usage if abused.\
It's advised to limit the amount of complex furnitures using the `max_per_chunk` property and the `config.yml` option `max_per_chunk`.
</Warning>


## Furniture item settings

In this example I will create a simple Ceiling Fan furniture.\
This will be used to spawn the furniture on interaction.

```yaml
  ceiling_fan:
    name: Ceiling Fan
    resource:
      material: PAPER
      generate: true
      texture: item/ceiling_fan
    behaviours:
      complex_furniture:
        entity: ceiling_fan
        light_level: 10 # Emits light
        solid: true # Hitbox made of BARRIER blocks
        drop_when_mined: true # Will be dropped when attacked by player
        max_per_chunk: 2 # Max amount of furnitures in chunk
        placement_offset: # Used to adjust the spawn location
          ceiling: -0.5
          wall: 0
          floor: 0
```

Create a file `my_furniture/textures/item/ceiling_fan.png`.

## Furniture custom entity settings

```yaml
entities:
  ceiling_fan:
    model_folder: entity/ceiling_fan
    type: ARMOR_STAND
    gravity: false
```

## Furniture model

Create a new `ItemsAdder Entity Model`.

<img src="../../.gitbook/assets/image (10).png" alt="" />

In this example I called it `ceiling_fan`.

<img src="../../.gitbook/assets/image (11).png" alt="" />

Create your model.

<img src="../../.gitbook/assets/image (23).png" alt="" />



Switch to the animation panel.&#x20;

<img src="../../.gitbook/assets/image (24).png" alt="" />

Create a new `idle` animation.

<img src="../../.gitbook/assets/image (25).png" alt="" />

<img src="../../.gitbook/assets/image (15).png" alt="" />

Animate the entity as you wish.

<img src="../../.gitbook/assets/image (26).png" alt="" />

Open the entity settings and set the correct namespace. In my example I use `my_furniture`.

<img src="../../.gitbook/assets/image (17).png" alt="" />

<img src="../../.gitbook/assets/image (22).png" alt="" />

Save the project as `ceiling_fan.iaentity`  (for example) inside your namespace folder root.\
You will be able to edit it anytime you want in the future.



<img src="../../.gitbook/assets/image (19).png" alt="" />

<img src="../../.gitbook/assets/image (20).png" alt="" />

Export the model. This is the model file that will be loaded by ItemsAdder.

<img src="../../.gitbook/assets/image (21).png" alt="" />

Get the item ingame using `/iaget my_furniture:ceiling_fan`.

<img src="../../.gitbook/assets/ezgif-4f55fae1f8968a (1).gif" alt="" />

