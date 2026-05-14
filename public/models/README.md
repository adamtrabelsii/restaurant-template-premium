# 3D Dish Models

Drop a Draco-compressed GLB here as `dish.glb` and the hero will auto-load it.

## Where to get free CC models

| Site | Notes |
|------|-------|
| **Sketchfab** (sketchfab.com) | Filter: *Downloadable*, License = *CC Attribution* / *CC0*. Search: `paella`, `tapas`, `spanish food`, `jamón`, `seafood plate`. Download as **glTF (.glb)**. |
| **Poly Pizza** (poly.pizza) | CC0 archive of Google Poly. Stylized but free + direct download. Search: `food`, `plate`, `dish`. |
| **Quaternius Ultimate Food Pack** (quaternius.com) | CC0, stylized. Has bowls, plates, pasta — good as placeholders. |
| **CGTrader / TurboSquid** | Paid (~$10–30) realistic restaurant food. Best quality. |

## Compress before shipping

Raw GLBs from Sketchfab are often 5–20 MB. Compress with **gltf-transform**:

```bash
npx @gltf-transform/cli optimize input.glb dish.glb --texture-compress webp
# or Draco geometry compression:
npx @gltf-transform/cli draco input.glb dish.glb
```

Target: **< 1 MB** for the hero model. Draco geometry + WebP textures usually hits this.

## Naming

- `dish.glb` — hero (scroll-bound rotation)
- `paella.glb`, `gambas.glb`, `secreto.glb` — optional per-card dishes (not yet wired up)

## Fallback

If `dish.glb` is missing, the hero shows a procedural placeholder so dev stays unblocked.
