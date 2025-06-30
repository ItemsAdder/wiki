---
icon: arrows-maximize
---

# Furniture size


<Warning>
**It's advised to use the small furniture (small Armor Stand)**
</Warning>


## How can I adjust the furniture position when placed?

If you want to adjust it you just have to use Blockbench as usual and:

![](<assets/images/immagine (31).png>)

1. Click on **display** on the right.
2. Click on the **armorstand icon** on the left.
3. Click on the **smile face** (**head**) on the left.
4. **Move** your model on the armorstand **bottom** (it's the **ground**).

### Too small furniture

If your furniture is **too small** but you want it **bigger** and with bigger **hitbox** just set this to **false**.\
If you instead want a **small furniture** with small hitbox just set it to true.


<Note>
Note: hitbox is not limited, you can set a bigger hitbox which will be unrelated to the entity itself.

Set the hitbox attributes:

```yaml
    hitbox:
      height: 2
      length: 3
      width: 3
```
</Note>


<Tabs>
  <Tab title="Big furniture">

```yaml
behaviours:
  furniture:
    small: false
```

  </Tab>
  <Tab title="Small furniture">

```yaml
behaviours:
  furniture:
    small: true
```

  </Tab>
</Tabs>


#### And set this in BlockBench

<Tabs>
  <Tab title="Big furniture">

![](<assets/images/immagine (106).png>)

  </Tab>
  <Tab title="Small furniture">

![](<assets/images/immagine (80).png>)

  </Tab>
</Tabs>

