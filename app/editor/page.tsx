import Link from 'next/link'
import SmallPageTitle from '../components/SmallPageTitle'
import AdminPageWrapper from '../components/AdminPageWrapper'

export default function EditorMainPage() {
    return (
        <AdminPageWrapper>
            <SmallPageTitle>Edit Design System</SmallPageTitle>

            <Link href="editor/color">Color</Link>
        </AdminPageWrapper>
    )
}
