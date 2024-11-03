import IssueForm from './_components/IssueForm';
import delay from 'delay';

const NewIssuePage = async () => {
    await delay(2000)
    return <IssueForm />
}

export default NewIssuePage
