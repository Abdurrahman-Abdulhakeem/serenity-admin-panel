'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Department } from '@/types/department';

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (data: { name: string }) => void;
    initialData: Department | null;
}

export default function DepartmentModal({ open, onClose, onSave, initialData = null }: Props) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (initialData) setName(initialData.name);
    else setName('');
  }, [initialData]);

  const handleSubmit = () => {
    onSave({ name });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='bg-card dark text-card-foreground'>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit' : 'Add'} Department</DialogTitle>
        </DialogHeader>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Department name" />
        <Button onClick={handleSubmit}>{initialData ? 'Update' : 'Create'}</Button>
      </DialogContent>
    </Dialog>
  );
}
