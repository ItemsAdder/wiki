---
icon: fill-drip
---

# Colored models


<Note>
### Why?

To make a colored element or a colored vehicle you don't have to make a separate model for each item with a different color.

For example a custom colored furniture.
</Note>


## How can I do this?

### 1. open your model with Blockbench

![](<assets/images/immagine (37).png>)

### 2. select the face you want to be colored

![](<assets/images/immagine (76).png>)

### 3. use a white/gray texture, for better coloring

### 4. enable the hidden "Tint" feature

![](<assets/images/immagine (34).png>)

![](<assets/images/immagine (91).png>)

### 5. enable the coloring for each face you want to be colored

![](<assets/images/immagine (108).png>)

### 6. set the specific color attribute in your .yml file.

In this example I used `leather_horse_armor` but you can also use `potion`.

```yaml
  orange_modern_lamp:
    display_name: "Orange Modern Lamp"
    specific_properties:
      leather_horse_armor:
        color: ORANGE
    resource:
      material: LEATHER_HORSE_ARMOR
      generate: false
      model_path: item/template_modern_lamp
```

#### Getting colors

* **Decimal** colors using [this tool](https://www.mathsisfun.com/hexadecimal-decimal-colors.html)
* Colors from this list
  * `WHITE`
  * `SILVER`
  * `GRAY`
  * `BLACK`
  * `RED`
  * `MAROON`
  * `YELLOW`
  * `OLIVE`
  * `LIME`
  * `GREEN`
  * `AQUA`
  * `TEAL`
  * `BLUE`
  * `NAVY`
  * `FUCHSIA`
  * `PURPLE`
  * `ORANGE`

### 7. now you can create as many as furnitures you want, just change the color and it will be automatically colored by the game

![](<assets/images/immagine (105).png>)
