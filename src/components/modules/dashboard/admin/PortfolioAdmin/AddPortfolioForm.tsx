'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { createPortfolio } from '@/services/Portfolio/portfolios';
import dynamic from "next/dynamic";

const PlateRichEditor = dynamic(() => import("@/components/rich-text/core/rich-editor"), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full animate-pulse bg-muted rounded-md" />,
});

const AddPortfolioForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      image: formData.get('image'),
      link: formData.get('link'),
      technologies: (formData.get('technologies') as string).split(',').map((t) => t.trim()),
    };

    try {
      const res = await createPortfolio(data);
      if (res.success) {
        toast.success('Portfolio added successfully!');
        router.push('/admin/portfolios');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to add portfolio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-card p-8 rounded-2xl border shadow-xl">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Project Title</label>
          <Input name="title" placeholder="E-commerce Website" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea name="description" placeholder="A brief description of the project..." required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Image URL</label>
          <Input name="image" placeholder="https://example.com/image.jpg" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Project Link</label>
          <Input name="link" placeholder="https://github.com/..." />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Technologies (comma separated)</label>
          <Input name="technologies" placeholder="Next.js, Tailwind, MongoDB" required />
        </div>
      </div>
      <Button type="submit" className="w-full bg-linear-to-r from-primary to-violet-600" disabled={loading}>
        {loading ? 'Adding...' : 'Add Portfolio Project'}
      </Button>
    </form>
  );
};

export default AddPortfolioForm;
