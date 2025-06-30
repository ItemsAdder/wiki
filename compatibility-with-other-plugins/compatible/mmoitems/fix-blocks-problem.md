---
icon: info
---

# Fix blocks problem


<Warning>
**MMOItems** blocks are not compatible with **ItemsAdder** and vice versa.
</Warning>


## How to use MMOItems blocks?

You have to open the `config.yml` file of **ItemsAdder** and disable **REAL** blocks (mushroom).


```yaml config.yml lines icon="yaml"
blocks:
  # ....
  custom:
    # ....
    mushroom: false
```



<Note>
After applying this change you won't be able to create ItemsAdder blocks with type: REAL.

Other ItemsAdder custom block types will still work (for example REAL\_NOTE).
</Note>