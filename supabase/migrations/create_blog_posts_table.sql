-- Create the blog_posts table
create table if not exists public.blog_posts (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    slug text not null unique,
    content text not null,
    image_url text not null,
    meta_description text not null,
    created_at timestamptz default now() not null,
    updated_at timestamptz
);

-- Enable Row Level Security
alter table public.blog_posts enable row level security;

-- Create policies
-- Allow anyone to read blog posts
create policy "Allow public read access"
on public.blog_posts
for select
to public
using (true);

-- Allow authenticated users to create blog posts
create policy "Allow authenticated users to create posts"
on public.blog_posts
for insert
to authenticated
with check (true);

-- Allow authenticated users to update their own posts
create policy "Allow authenticated users to update posts"
on public.blog_posts
for update
to authenticated
using (true)
with check (true);

-- Allow authenticated users to delete their own posts
create policy "Allow authenticated users to delete posts"
on public.blog_posts
for delete
to authenticated
using (true);

-- Create indexes
create index if not exists blog_posts_slug_idx on public.blog_posts (slug);
create index if not exists blog_posts_created_at_idx on public.blog_posts (created_at desc); 