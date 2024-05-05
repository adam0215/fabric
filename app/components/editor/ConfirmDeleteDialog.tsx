import { ReactNode, useState } from 'react'
import { Button } from '../shadcn/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from '../shadcn/dialog'

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function ConfirmDeleteDialog({
    nameOfDeletion,
    action,
    children,
    onSubmit,
}: {
    nameOfDeletion: string
    action?: () => void
    onSubmit?: () => void
    children: ReactNode
}) {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form
                    action={async () => {
                        if (action) action()
                        setOpen(false)
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>
                            Are you sure you want to delete {nameOfDeletion}?
                        </DialogTitle>
                        <DialogDescription>
                            By confirming to delete {nameOfDeletion} you remove
                            it permanently.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="rounded-full bg-zinc-100 text-black transition-all duration-150 hover:bg-zinc-200">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            className="rounded-full bg-red-500 text-white transition-all duration-150 hover:bg-red-600"
                            onClick={() => onSubmit && onSubmit()}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
