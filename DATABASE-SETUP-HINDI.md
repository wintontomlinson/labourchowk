# Database kaise banayein — 3 minute (aasan tarika)

App bina database ke bhi chalta hai (demo data pe). Real database chahiye — jisme
bookings, workers waqai save hon — to neeche ke steps follow karo.

> Zaroori: Database ek **hosted service** pe hona chahiye taaki Vercel usse connect
> kar sake. Free options hain — paisa nahi lagega.

---

## Step 1 — Free database banao (Neon sabse aasan)

1. https://neon.tech kholo → **Sign up** (GitHub se login kar sakte ho).
2. **Create project** dabao. Region koi bhi (Singapore/US).
3. Project bante hi ek **connection string** milegi. Aisi dikhegi:

   ```
   postgresql://user:password@ep-xxxx.aws.neon.tech/dbname?sslmode=require
   ```

   Isko **copy** kar lo. (Neon mein "Connection string" section mein milegi —
   "Pooled connection" wali le lena.)

   > Neon ke alawa **Supabase** (supabase.com) ya **Vercel Postgres** (Vercel
   > dashboard → Storage) bhi chalega — process same hai, bas connection string chahiye.

---

## Step 2 — Vercel mein connection string daalo

1. Vercel dashboard → apna project → **Settings** → **Environment Variables**.
2. Naya variable add karo:
   - **Name:** `DATABASE_URL`
   - **Value:** upar copy ki hui connection string paste karo
   - **Environments:** Production, Preview, Development — teeno tick karo
3. **Save** dabao.
4. **Deployments** tab → latest deployment → **Redeploy**.

Bas! Ab aapki live site real database pe chalegi.

---

## Step 3 — Tables banao aur demo data bharo (ek baar)

Yeh apne computer se (ya Vercel ke DATABASE_URL ke saath) ek baar chalana hai.

Apne computer par project folder mein `.env` file banao:

```
DATABASE_URL="yahan_apni_connection_string_paste_karo"
```

Phir ye command chalao:

```bash
npm install
npm run db:setup
```

`db:setup` do kaam karta hai:
- **Tables banata hai** (workers, services, bookings, reviews, cities, etc.)
- **Demo data bharta hai** (16 workers, saari services, bookings, reviews)

Data dekhne ke liye (optional): `npm run db:studio` — browser mein table khul jayegi.

---

## Ho gaya ✅

Ab:
- Site pe jo bookings banengi woh **database mein save** hongi.
- Workers, reviews, dashboards — sab **database se** aayenge.
- Agar kabhi `DATABASE_URL` hata do, to app apne aap demo data pe wapas chali jayegi
  (kuch nahi tootega).

## Koi dikkat aaye?
- "Can't reach database server" → connection string galat hai ya end mein
  `?sslmode=require` missing hai.
- Vercel pe change dikh nahi raha → **Redeploy** karna zaroori hai env add karne ke baad.

Poora technical detail `DATABASE.md` mein hai.
