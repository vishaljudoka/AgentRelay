# 🔄 n8n Workflow Setup Guide

**Quick guide to integrate the n8n workflow with AgentRelay**

---

## ⚠️ Important

**AgentRelay requires this n8n workflow to function.** The workflow processes jobs sent from your Next.js app.

**Flow:** `Next.js → n8n Webhook → Apify → OpenAI → Supabase → Dashboard`

---

## 🚀 Quick Setup (5 Steps)

### Step 1: Install n8n

**Option A: Docker (Recommended)**
```bash
docker run -d -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  --name n8n \
  n8nio/n8n
```

**Option B: n8n Cloud**
- Sign up at https://n8n.io/cloud

Access n8n at: `http://localhost:5678`

---

### Step 2: Import Workflow

1. Open n8n dashboard
2. Click "**+ Add workflow**" → "**Import from File**"
3. Select `n8n-workflow-backup.json`
4. Click "**Save**"

---

### Step 3: Create API Credentials

You need 4 credentials:

#### 3.1 Apify API
1. Get key from: https://console.apify.com/account/integrations
2. In n8n: **Credentials** → **New** → **Apify API**
3. Paste key → Save

#### 3.2 OpenAI API
1. Get key from: https://platform.openai.com/api-keys
2. In n8n: **Credentials** → **New** → **OpenAI API**
3. Paste key → Save

#### 3.3 Supabase
1. Get from Supabase Dashboard → **Settings** → **API**
2. In n8n: **Credentials** → **New** → **Supabase**
   - Host: `https://yourproject.supabase.co`
   - Service Role Key: (copy from Supabase)
3. Save

#### 3.4 Webhook Secret
1. Generate secret:
   ```bash
   openssl rand -hex 32
   ```
2. In n8n: **Credentials** → **New** → **Header Auth**
   - Name: `Webhook Secret`
   - Header Name: `x-n8n-secret`
   - Value: (paste generated secret)
3. **Save this secret** - you'll need it later!

---

### Step 4: Assign Credentials to Nodes

Open the workflow and click on each node to assign credentials:

| Node Name | Credential Type |
|-----------|-----------------|
| Webhook Trigger | Header Auth |
| Run an Actor and get dataset | Apify API |
| OpenAI Chat Model | OpenAI API |
| Update a success row | Supabase |
| Update Failed node | Supabase |

**Save workflow** after assigning all credentials.

---

### Step 5: Configure Next.js App

1. **Copy webhook URL** from the "Webhook Trigger" node in n8n
2. **Update `.env.local`**:
   ```env
   N8N_WEBHOOK_URL=https://your-n8n-url.com/webhook/agentrelay
   N8N_WEBHOOK_SECRET=your-secret-from-step-3.4
   ```
3. **Restart your app**:
   ```bash
   npm run dev
   ```
4. **Activate workflow** in n8n (toggle switch in top-right)

---

## ✅ Testing

### Test 1: Quick Webhook Test
```bash
curl -X POST YOUR_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -H "x-n8n-secret: YOUR_SECRET" \
  -d '{
    "topic": "Docker basics",
    "seedUrls": ["https://docs.docker.com/get-started/"],
    "maxItems": 1,
    "user_id": "test",
    "job_id": "test-123"
  }'
```

**Expected:** n8n workflow executes (check **Executions** tab)

### Test 2: Full Integration Test
1. Go to `http://localhost:3000/dashboard`
2. Create new job with topic and URLs
3. Watch n8n **Executions** tab
4. Check dashboard for "completed" status (30-60 seconds)

---

## 🔧 Common Issues

### Issue: "Webhook not found" (404)
**Fix:** 
- Activate workflow in n8n (toggle switch)
- Check webhook URL matches `.env.local`

### Issue: "Unauthorized" (401)
**Fix:**
- Verify `N8N_WEBHOOK_SECRET` matches n8n credential exactly
- Regenerate secret if needed (update both places)

### Issue: Job stays "pending"
**Fix:**
- Check Supabase credentials in n8n
- Verify service role key is correct
- Check n8n execution for errors

### Issue: "No content extracted"
**Fix:**
- Try different/simpler URLs
- Check seed URLs are publicly accessible
- Review Apify execution in n8n

---

## 📊 Workflow Overview

```
┌──────────────┐
│ 1. Receive   │ ← Webhook from Next.js
│   Webhook    │
└──────┬───────┘
       │
┌──────▼───────┐
│ 2. Normalize │ Extract job data
│   Input      │
└──────┬───────┘
       │
┌──────▼───────┐
│ 3. Crawl     │ Apify scrapes URLs
│   URLs       │
└──────┬───────┘
       │
┌──────▼───────┐
│ 4. Clean     │ Normalize content
│   Content    │
└──────┬───────┘
       │
┌──────▼───────┐
│ 5. Combine   │ Merge for AI
│   Sources    │
└──────┬───────┘
       │
┌──────▼───────┐
│ 6. AI        │ OpenAI analyzes
│   Analysis   │
└──────┬───────┘
       │
┌──────▼───────┐
│ 7. Update    │ Save to Supabase
│   Database   │
└──────────────┘
```

**Time:** 30-60 seconds per job  
**Cost:** ~$0.03 per job (Apify + OpenAI)

---

## ⚙️ Optional: Adjust Settings

### Reduce Content Size (Lower Costs)
Edit "**Normalize article**" node:
```javascript
// Find line with:
const content = cleanText(rawContent).slice(0, 2500);

// Change to:
const content = cleanText(rawContent).slice(0, 1500);
```

### Change AI Creativity
Edit "**OpenAI Chat Model**" node:
```json
{
  "temperature": 0.3  // 0 = factual, 1 = creative
}
```

---

## 📚 Additional Resources

- n8n Docs: https://docs.n8n.io
- Apify Crawler: https://apify.com/apify/website-content-crawler
- OpenAI API: https://platform.openai.com/docs

---

## ✅ Checklist

Before going live:

- [ ] n8n workflow imported
- [ ] All 4 credentials configured
- [ ] Credentials assigned to nodes
- [ ] Webhook URL copied
- [ ] `.env.local` updated
- [ ] Workflow activated
- [ ] Test webhook works
- [ ] Full integration test passed

---

**Need Help?** Check the troubleshooting section above or review n8n execution logs for detailed errors.

**Last Updated:** December 30, 2025
