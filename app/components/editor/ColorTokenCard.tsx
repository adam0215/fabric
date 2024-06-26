'use client'

import { Button } from '@/app/components/shadcn/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/app/components/shadcn/dialog'
import { Input } from '@/app/components/shadcn/input'
import { Label } from '@/app/components/shadcn/label'
import { addHashtagToHexCode } from '@/app/utils/colorUtils'
import { DialogClose } from '@radix-ui/react-dialog'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
    addColorToken,
    deleteColorToken,
    updateColorToken,
} from '@/app/actions'
import tinycolor from 'tinycolor2'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/components/shadcn/select'
import { ColorCategoriesTableSchemaType } from '@/app/querySchemas'
import { ConfirmDeleteDialog } from './ConfirmDeleteDialog'

export type ColorTokenCard = {
    id: number
    colorName: string
    hexCode: string
    category: string
    categoryId: number
}

export function ColorTokenCard(
    props: ColorTokenCard & { colorCategories: ColorCategoriesTableSchemaType },
) {
    return (
        <div className="group relative flex min-h-40 w-32 flex-col gap-2 overflow-hidden rounded-md p-2 ring-2 ring-zinc-100">
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-white/60 opacity-0 backdrop-blur-[1px] transition-all duration-300 group-hover:opacity-100">
                <EditColorDialog {...props} />
            </div>
            <div
                className="h-16 w-full rounded"
                style={{ backgroundColor: addHashtagToHexCode(props.hexCode) }}
            ></div>
            <p className="font-medium">{props.colorName}</p>
            <div className="flex flex-col gap-1 text-sm text-zinc-500">
                <p>{addHashtagToHexCode(props.hexCode)}</p>
            </div>
        </div>
    )
}

export function AddColorTokenCard({
    currentCategoryId,
    colorCategories,
}: {
    currentCategoryId: ColorCategoriesTableSchemaType[0]['id']
    colorCategories: ColorCategoriesTableSchemaType
}) {
    return (
        <div className="relative flex min-h-40 w-32 flex-col gap-2 overflow-hidden rounded-md p-2 ring-2 ring-zinc-100">
            <div
                title="Add color"
                className="grid h-full w-full cursor-pointer place-items-center rounded bg-zinc-100 stroke-zinc-500 transition-all duration-150 hover:bg-zinc-200"
            >
                <AddColorDialog
                    colorCategories={colorCategories}
                    currentCategoryId={currentCategoryId}
                />
            </div>
        </div>
    )
}

export function EditColorDialog({
    id,
    colorName,
    hexCode,
    categoryId,
    colorCategories,
}: ColorTokenCard & { colorCategories: ColorCategoriesTableSchemaType }) {
    const updateColorTokenWithId = updateColorToken.bind(null, id)
    const [open, setOpen] = useState(false)
    const [formPending, setFormPending] = useState(false)
    const [previewColor, setPreviewColor] = useState(hexCode)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="h-8 rounded-full bg-zinc-800 px-3 text-sm text-white transition-all duration-150 hover:bg-zinc-700">
                    Edit color
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit {colorName ?? 'color'}</DialogTitle>
                    <DialogDescription>
                        Make changes to your color token here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <form
                    action={async (data) => {
                        setFormPending(true)
                        await updateColorTokenWithId(data).then(() => {
                            setFormPending(false)
                            setOpen(false)
                        })
                    }}
                >
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="color-name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="color-name"
                                name="color-name"
                                defaultValue={colorName}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="hexCode" className="text-right">
                                Hex code
                            </Label>
                            <Input
                                id="hex-code"
                                name="hex-code"
                                defaultValue={hexCode}
                                className="col-span-3"
                                onChange={(e) => {
                                    const inputHexCode = e.target.value
                                    const isValidHexColor = tinycolor(
                                        addHashtagToHexCode(inputHexCode),
                                    ).isValid()

                                    if (isValidHexColor)
                                        setPreviewColor(inputHexCode)
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="color-category"
                                className="text-right"
                            >
                                Category
                            </Label>
                            <Select
                                name="color-category"
                                defaultValue={`${categoryId}`}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {colorCategories.map((category) => (
                                        <SelectItem
                                            value={`${category.id}`}
                                            key={category.id}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <p className="text-right text-sm font-medium">
                                Preview
                            </p>
                            <span
                                className="aspect-square h-10 rounded-full"
                                style={{
                                    backgroundColor:
                                        addHashtagToHexCode(previewColor),
                                }}
                            />
                        </div>
                    </div>
                    <DialogFooter className="grid grid-cols-4 gap-4">
                        <ConfirmDeleteDialog
                            nameOfDeletion={colorName}
                            action={async () => deleteColorToken(id)}
                            onSubmit={() => setOpen(false)}
                        >
                            <Button
                                title="Remove color"
                                className="col-start-2 aspect-square rounded-full bg-transparent stroke-red-500 p-0 hover:bg-red-500 hover:stroke-white"
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

export function AddColorDialog({
    currentCategoryId,
    colorCategories,
}: {
    currentCategoryId: ColorCategoriesTableSchemaType[0]['id']
    colorCategories: ColorCategoriesTableSchemaType
}) {
    const [open, setOpen] = useState(false)
    const [formPending, setFormPending] = useState(false)
    const [previewColor, setPreviewColor] = useState('84cc16')

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="grid h-full w-full place-items-center">
                <Plus color="inherit" size={24} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add color</DialogTitle>
                    <DialogDescription>
                        Add a new color token by filling in the details below.
                        Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form
                    action={async (data) => {
                        setFormPending(true)
                        await addColorToken(data).then(() => {
                            setFormPending(false)
                            setOpen(false)
                        })
                    }}
                >
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="color-name" className="text-right">
                                Name
                            </Label>
                            <Input
                                required
                                id="color-name"
                                name="color-name"
                                placeholder="Grassy Green"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="hex-code" className="text-right">
                                Hex code
                            </Label>
                            <Input
                                required
                                id="hex-code"
                                name="hex-code"
                                placeholder="#84CC16"
                                className="col-span-3"
                                onChange={(e) => {
                                    const inputHexCode = e.target.value
                                    const isValidHexColor = tinycolor(
                                        addHashtagToHexCode(inputHexCode),
                                    ).isValid()

                                    if (isValidHexColor)
                                        setPreviewColor(inputHexCode)
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="color-category"
                                className="text-right"
                            >
                                Category
                            </Label>
                            <Select
                                name="color-category"
                                defaultValue={`${currentCategoryId}`}
                                required
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {colorCategories.map((category) => (
                                        <SelectItem
                                            value={`${category.id}`}
                                            key={category.id}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <p className="text-right text-sm font-medium">
                                Preview
                            </p>
                            <span
                                className="aspect-square h-10 rounded-full"
                                style={{
                                    backgroundColor:
                                        addHashtagToHexCode(previewColor),
                                }}
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
                            Add color
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
