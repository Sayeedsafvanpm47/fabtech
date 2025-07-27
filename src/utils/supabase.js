import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ifnfdagpeborvbfdkruh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmbmZkYWdwZWJvcnZiZmRrcnVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MTA5NDUsImV4cCI6MjA2OTE4Njk0NX0.XRuGf5Qv-uu0MqNMy5Bdf6BnfzmEWa0Jsbb8i26CpzI';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Blog posts table operations
export const blogPostsTable = {
  async getAllPosts() {
    try {
      console.log('Attempting to fetch all posts from Supabase...');
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error fetching posts:', error);
        throw new Error(`Failed to fetch posts: ${error.message}`);
      }

      console.log('Successfully fetched posts:', data);
      return data || [];
    } catch (err) {
      console.error('Error in getAllPosts:', err);
      throw err;
    }
  },

  async getPostById(id) {
    try {
      console.log('Attempting to fetch post by ID:', id);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Supabase error fetching post by ID:', error);
        throw new Error(`Failed to fetch post: ${error.message}`);
      }

      console.log('Successfully fetched post:', data);
      return data;
    } catch (err) {
      console.error('Error in getPostById:', err);
      throw err;
    }
  },

  async getPostBySlug(slug) {
    try {
      console.log('Attempting to fetch post by slug:', slug);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) {
        console.error('Supabase error fetching post by slug:', error);
        throw new Error(`Failed to fetch post: ${error.message}`);
      }

      console.log('Successfully fetched post:', data);
      return data;
    } catch (err) {
      console.error('Error in getPostBySlug:', err);
      throw err;
    }
  },

  async createPost({ title, content, slug, image_url, meta_description }) {
    try {
      console.log('Attempting to create post:', { title, slug });
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([
          {
            title,
            content,
            slug,
            image_url,
            meta_description,
            created_at: new Date().toISOString(),
          }
        ])
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error creating post:', error);
        if (error.code === '23505') {
          throw new Error('A post with this slug already exists. Please choose a different title.');
        }
        throw new Error(`Failed to create post: ${error.message}`);
      }

      console.log('Successfully created post:', data);
      return data;
    } catch (err) {
      console.error('Error in createPost:', err);
      throw err;
    }
  },

  async updatePost(id, { title, content, slug, image_url, meta_description }) {
    try {
      console.log('Attempting to update post:', id);
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          title,
          content,
          slug,
          image_url,
          meta_description,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error updating post:', error);
        throw new Error(`Failed to update post: ${error.message}`);
      }

      console.log('Successfully updated post:', data);
      return data;
    } catch (err) {
      console.error('Error in updatePost:', err);
      throw err;
    }
  },

  async deletePost(id) {
    try {
      console.log('Attempting to delete post:', id);
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Supabase error deleting post:', error);
        throw new Error(`Failed to delete post: ${error.message}`);
      }

      console.log('Successfully deleted post:', id);
      return true;
    } catch (err) {
      console.error('Error in deletePost:', err);
      throw err;
    }
  }
};

// Admin authentication operations
export const adminAuth = {
  async signIn(email, password) {
    try {
      console.log('Attempting to sign in:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Supabase auth error:', error);
        throw new Error('Invalid email or password');
      }

      console.log('Successfully signed in:', data);
      return data;
    } catch (err) {
      console.error('Error in signIn:', err);
      throw err;
    }
  },

  async signOut() {
    try {
      console.log('Attempting to sign out');
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Supabase sign out error:', error);
        throw new Error('Failed to sign out');
      }

      console.log('Successfully signed out');
    } catch (err) {
      console.error('Error in signOut:', err);
      throw err;
    }
  },

  async getCurrentSession() {
    try {
      console.log('Getting current session');
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Supabase session error:', error);
        throw new Error('Failed to get current session');
      }

      console.log('Current session:', session);
      return session;
    } catch (err) {
      console.error('Error in getCurrentSession:', err);
      throw err;
    }
  }
}; 