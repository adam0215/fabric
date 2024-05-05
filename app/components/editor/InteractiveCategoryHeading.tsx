'use client'

import { ColorCategoriesTableSchemaType } from '@/app/dbSchema'
import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
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
import { Button } from '../shadcn/button'
import { Label } from '../shadcn/label'
import { Input } from '../shadcn/input'
import { Textarea } from '../shadcn/textarea'
import { deleteColorCategory, updateColorCategory } from '@/app/actions'
import { ConfirmDeleteDialog } from './ConfirmDeleteDialog'

export default function InteractiveCategoryHeading(
    props: ColorCategoriesTableSchemaType[0],
) {
    return (
        <span className="group inline-flex items-center gap-2" role="button">
            <EditCategoryDialog
                id={props.id}
                name={props.name}
                description={props.description}
            />
        </span>
    )
}
function EditCategoryDialog({
    id,
    name,
    description,
}: {
    id: number
    name: string
    description: string
}) {
    const updateColorCategoryWithId = updateColorCategory.bind(null, id)
    const [open, setOpen] = useState(false)
    const [formPending, setFormPending] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="group flex w-full items-center justify-between gap-4">
                <DialogTrigger asChild>
                    <span
                        className="group inline-flex items-center gap-2"
                        role="button"
                    >
                        <h3 className="cursor-pointer text-2xl font-medium text-zinc-600">
                            {name}
                        </h3>
                        <button className="opacity-0 transition-all duration-150 group-hover:opacity-100">
                            <Pencil
                                size={20}
                                color="inherit"
                                className="stroke-zinc-600"
                            />
                        </button>
                    </span>
                </DialogTrigger>
            </div>
            <DialogContent className="sm:max-w-[640px]">
                <DialogHeader>
                    <DialogTitle>Edit {name}</DialogTitle>
                    <DialogDescription>
                        Edit the details of the color category below. Click save
                        when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form
                    action={async (data) => {
                        setFormPending(true)
                        await updateColorCategoryWithId(data).then(() => {
                            setFormPending(false)
                            setOpen(false)
                        })
                    }}
                >
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="category-name"
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
                                defaultValue={name}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="category-desc"
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
                                defaultValue={description}
                            />
                        </div>
                    </div>
                    <DialogFooter className="grid grid-cols-4 gap-4">
                        <ConfirmDeleteDialog
                            nameOfDeletion={name}
                            action={async () => deleteColorCategory(id)}
                            onSubmit={() => setOpen(false)}
                        >
                            <Button
                                title="Remove category"
                                className="col-start-2 aspect-square rounded-full bg-transparent stroke-red-500 p-0 hover:bg-red-500 hover:stroke-white"
                                name="delete-btn"
                                value="delete"
                            >
                                <Trash2 color="inherit" size={20} />
                            </Button>
                        </ConfirmDeleteDialog>
                        <div className="col-span-2 col-start-3 inline-flex justify-end gap-2">
                            <DialogClose asChild>
                                <Button className="rounded-full bg-zinc-100 text-red-500 transition-all duration-150 hover:bg-red-500 hover:text-white">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                className="rounded-full transition-all duration-150"
                                name="update-btn"
                                value="update"
                                type="submit"
                                disabled={formPending}
                            >
                                Save changes
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
