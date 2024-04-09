import { EmailList } from "../../EmailList/EmailList";
import { EmailEditor } from "../../email-editor/EmailEditor";

export function Home() {
    return <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr .6fr',
        padding: '1.5rem',

    }}>
        <EmailEditor />
        <EmailList />
    </div>
}