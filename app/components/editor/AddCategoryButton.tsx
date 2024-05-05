'use client'

import { Plus } from 'lucide-react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../shadcn/dialog'
import { addColorCategory } from '@/app/actions'
import { Label } from '../shadcn/label'
import { Input } from '../shadcn/input'
import { Button } from '../shadcn/button'
import { useState } from 'react'
import { Textarea } from '../shadcn/textarea'

export default function AddCategoryButton() {
    const [open, setOpen] = useState(false)
    const [formPending, setFormPending] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="group flex w-full items-center justify-between gap-4">
                <span className="h-[4px] w-full bg-zinc-100 transition-all duration-300 group-hover:bg-zinc-200" />
                <DialogTrigger asChild>
                    <button className="inline-flex min-w-max rounded-full bg-zinc-100 px-4 py-2 text-sm transition-all duration-300 group-hover:bg-zinc-200">
                        Add category
                    </button>
                </DialogTrigger>
                <span className="h-[4px] w-full bg-zinc-100 transition-all duration-300 group-hover:bg-zinc-200" />
            </div>
            <DialogContent className="sm:max-w-[640px]">
                <DialogHeader>
                    <DialogTitle>Add color category</DialogTitle>
                    <DialogDescription>
                        Add a new color category by filling in the details
                        below. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form
                    action={async (data) => {
                        setFormPending(true)
                        await addColorCategory(data).then(() => {
                            setFormPending(false)
                            setOpen(false)
                        })
                    }}
                >
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="categoryName"
                                className="text-right"
                            >
                                Name
                            </Label>
                            <Input
                                required
                                id="category-name"
                                name="category-name"
                                placeholder="Main Colors"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="categoryDescription"
                                className="text-right"
                            >
                                Description
                            </Label>
                            <Textarea
                                required
                                id="category-desc"
                                name="category-desc"
                                className="col-span-3 h-32"
                                placeholder="Tempor ullamco elit in id voluptate. Irure qui eu quis amet ea aliquip laborum excepteur qui cillum reprehenderit. Velit laboris exercitation aute occaecat eiusmod est voluptate consectetur in cupidatat ipsum officia nisi qui."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="rounded-full bg-zinc-100 text-red-500 transition-all duration-150 hover:bg-red-500 hover:text-white">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            className="rounded-full transition-all duration-150"
                            type="submit"
                            disabled={formPending}
                        >
                            Add category
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
