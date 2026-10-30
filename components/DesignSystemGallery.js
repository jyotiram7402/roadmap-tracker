"use client";
import { useState } from "react";
import { Search, Check, Copy, Monitor } from "@/components/icons";
import CodeBlock from "@/components/CodeBlock";
import {
  Button, IconButton, Input, Textarea, Select, FormField, Badge, DifficultyChip,
  Skeleton, SkeletonText, SkeletonRows, EmptyState, ErrorState, Progress, Container,
  LoadMore, ScrollableTabs, PageHeader, ResponsiveDialog,
} from "@/components/ui";

const TOKENS = [
  ["--bg", "Background"], ["--surface", "Surface"], ["--surface-2", "Surface 2"], ["--border", "Border"],
  ["--fg", "Foreground"], ["--muted-fg", "Muted"], ["--primary", "Primary"], ["--brand", "Brand"],
  ["--success", "Success"], ["--warning", "Warning"], ["--danger", "Danger"], ["--info", "Info"],
  ["--diff-easy", "Easy"], ["--diff-medium", "Medium"], ["--diff-hard", "Hard"],
];

function Section({ title, children }) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">{title}</h2>
      <div className="rounded-surface border border-border bg-surface p-4 sm:p-6 space-y-4">{children}</div>
    </section>
  );
}

export default function DesignSystemGallery() {
  const [tab, setTab] = useState("problems");
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(20);

  return (
    <div className="min-h-dvh bg-background text-fg">
      <PageHeader title="Design system" meta="Tokens and primitives · dev only" icon={<Monitor size={16} />} actions={<Button size="sm" variant="secondary">Action</Button>}>
        <ScrollableTabs
          ariaLabel="Demo tabs"
          value={tab}
          onChange={setTab}
          tabs={[
            { value: "problems", label: "Problems", count: 1333 },
            { value: "sheets", label: "Sheets", count: 5 },
            { value: "crackify", label: "Crackify" },
            { value: "logic", label: "Logic building" },
            { value: "more", label: "A very long tab label" },
          ]}
        />
      </PageHeader>

      <Container className="py-6 space-y-8">
        <Section title="Color tokens">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {TOKENS.map(([v, label]) => (
              <div key={v} className="rounded-control border border-border overflow-hidden">
                <div className="h-12" style={{ background: `var(${v})` }} />
                <div className="px-2.5 py-2">
                  <div className="text-xs font-medium">{label}</div>
                  <div className="text-[11px] text-muted font-mono">{v}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Typography">
          <h1 className="text-3xl font-black tracking-tight">Display · Inter 800</h1>
          <h2 className="text-xl font-bold">Heading · Inter 700</h2>
          <p className="text-sm text-muted max-w-prose">Body · Inter 400. The quick brown fox jumps over the lazy dog. Secondary text uses the muted token so it stays readable in both themes.</p>
          <code className="font-mono text-sm bg-surface-2 rounded-chip px-2 py-1 inline-block">font-mono · JetBrains Mono · const x = 42;</code>
        </Section>

        <Section title="Buttons">
          <div className="flex flex-wrap items-center gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="brand">Brand</Button>
            <Button variant="danger">Danger</Button>
            <Button loading>Saving</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" leftIcon={<Check size={14} />}>Small</Button>
            <Button size="lg">Large</Button>
            <Button href="/dashboard" variant="secondary">Link button</Button>
            <IconButton label="Copy"><Copy size={18} /></IconButton>
            <IconButton label="Search" variant="secondary"><Search size={18} /></IconButton>
          </div>
        </Section>

        <Section title="Forms">
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Email" hint="We never share it." required>
              <Input type="email" placeholder="you@example.com" autoComplete="email" />
            </FormField>
            <FormField label="Search" >
              <Input placeholder="Search problems…" leftIcon={<Search size={16} />} />
            </FormField>
            <FormField label="Difficulty">
              <Select defaultValue="all">
                <option value="all">All</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Select>
            </FormField>
            <FormField label="Password" error="At least 6 characters." trailing={<a className="text-xs text-primary hover:underline" href="#">Forgot?</a>}>
              <Input type="password" placeholder="••••••••" />
            </FormField>
            <FormField label="Notes" className="sm:col-span-2">
              <Textarea placeholder="Paste notes or code — code is detected automatically." />
            </FormField>
          </div>
        </Section>

        <Section title="Badges & difficulty">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Neutral</Badge>
            <Badge tone="primary">Primary</Badge>
            <Badge tone="brand">Brand</Badge>
            <Badge tone="success" icon={<Check size={12} />}>Solved</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="danger">Danger</Badge>
            <Badge tone="info" size="md">Info md</Badge>
            <Badge tone="neutral" size="xs">xs</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <DifficultyChip level="easy" />
            <DifficultyChip level="medium" />
            <DifficultyChip level="hard" />
            <DifficultyChip level={null} />
          </div>
          <Progress value={64} label="Checklist" />
          <Progress value={30} tone="success" size="sm" label="Solved" />
        </Section>

        <Section title="States">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Skeleton className="h-6 w-1/2" />
              <SkeletonText />
              <SkeletonRows rows={3} />
            </div>
            <div className="space-y-2">
              <EmptyState title="No bookmarks yet" description="Tap the bookmark icon on any problem to save it here." action={<Button variant="secondary">Browse problems</Button>} />
              <ErrorState description="Could not load your progress. Check your connection and try again." onRetry={() => {}} />
            </div>
          </div>
        </Section>

        <Section title="Code block">
          <CodeBlock lines={["public int maxProfit(int[] prices) {", "    int profit = 0;", "    for (int i = 1; i < prices.length; i++) {", "        profit += Math.max(0, prices[i] - prices[i - 1]);", "    }", "    return profit;", "}"]} />
        </Section>

        <Section title="Pagination & dialog">
          <LoadMore shown={shown} total={79} step={20} onMore={() => setShown((s) => s + 20)} />
          <Button variant="secondary" onClick={() => setOpen(true)}>Open responsive dialog</Button>
          <ResponsiveDialog
            open={open}
            onClose={() => setOpen(false)}
            title="Request a custom plan"
            description="Bottom sheet on phones, centered on desktop. Escape closes."
            footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Send</Button></>}
          >
            <FormField label="Your goal">
              <Textarea rows={4} placeholder="e.g. Java backend → GenAI engineer in 6 months" />
            </FormField>
          </ResponsiveDialog>
        </Section>
      </Container>
    </div>
  );
}
