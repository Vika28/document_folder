import styles from './form.module.scss';
import {useEffect, useState} from "react";
import DocumentItem from "../DocumentItem/DocumentItem";

function Form() {
    const [documents, setDocuments] = useState([]);
    const [documentName, setDocumentName] = useState('');
    const [documentBody, setDocumentBody] = useState('');
    const [filterState, setFilterState] = useState(false);
    const [sortType, setSortType] = useState('reset');
    const [filterType, setFilterType] = useState('0');
    const [filteredItems, setFilteredItems] = useState([]);

    function createDoc(e) {
        e.preventDefault();
        if(localStorage.getItem('docs') === null) {
            let newArr = [];
            newArr.push({id: Date.now(), docName: documentName, docBody: documentBody, docDate: new Date(), docRate: 0});
            localStorage.setItem('docs', JSON.stringify(newArr));
            setDocuments(newArr);
        } else {
            let docs = JSON.parse(localStorage.getItem('docs'));
            docs = [...docs, {id: Date.now(), docName: documentName, docBody: documentBody, docDate: new Date(), docRate: 0}];
            localStorage.setItem('docs', JSON.stringify(docs));
            setDocuments(docs);
        }
        setDocumentName('');
        setDocumentBody('');
        return (<div>

        </div>)
    }

    const handleChangeDocumentName = (event) => {
        setDocumentName(event.currentTarget.value);
    }
    const handleChangeDocumentBody = (event) => {
        setDocumentBody(event.currentTarget.value);
    }

    function removeDoc (currentId) {
        const restDocs = documents.filter((item) => item.id !== currentId);
        setDocuments(restDocs);
        localStorage.setItem('docs', JSON.stringify(restDocs));
    }

    function sortItems (howToSort) {
        if (howToSort === 'fromAtoZ') {
            console.log('fromAtoZ');

            documents.sort(function(a, b){
                let nameA = a.docName.toLowerCase();
                let nameB = b.docName.toLowerCase();
                if (nameA < nameB)
                    return -1
            })
            setDocuments(documents);

        } else if (howToSort === 'fromZtoA') {
            documents.sort(function(a, b){
                let nameA = a.docName.toLowerCase();
                let nameB = b.docName.toLowerCase();
                if (nameA > nameB)
                    return -1
            })
            setDocuments(documents);
        } else if (howToSort === 'reset') {
            setDocuments(JSON.parse(localStorage.getItem('docs')));
        }
        setSortType(howToSort);
    }

    function filterItems (filterBy) {
        setFilterState(true);
        console.log('filterState', filterState);
        const filteredItems = documents.filter((doc) => {
            return doc.docRate == filterBy
        });
        setFilteredItems(filteredItems);
        setFilterType(filterBy);
        if (filterBy === 'reset') {
            setFilterState(false);
        }
    }

    useEffect(() => {
        if(localStorage.getItem('docs') !== null) {
            setDocuments(JSON.parse(localStorage.getItem('docs')));
            console.log('set', JSON.parse(localStorage.getItem('docs')))
        }
    }, []);

    return (
        <div className={styles.container}>
            <div>
                {documents.length !== 0 && (
                    <div className={styles.selectsWrapper}>
                        <select className={styles.select}
                                defaultValue={'DEFAULT'}
                                onChange={(e) => {
                            sortItems(e.target.value);
                                }}
                        >
                            <option value="DEFAULT" selected={true} disabled="disabled">Sort by</option>
                            <option value="fromAtoZ">Sort A-Z</option>
                            <option value="fromZtoA">Sort Z-A</option>
                            <option value="reset">Reset</option>
                        </select>
                        <select
                            className={styles.select}
                            defaultValue={'DEFAULT'}
                            onChange={
                                (e) => {
                                    filterItems(e.target.value);
                                }
                            }
                        >
                            <option value="DEFAULT" selected={true} disabled="disabled">Filter by</option>
                            <option value="5">5 stars</option>
                            <option value="4">4stars</option>
                            <option value="3">3stars</option>
                            <option value="2">2stars</option>
                            <option value="1">1stars</option>
                            <option value="0">0stars</option>
                            <option value="reset">reset</option>
                        </select>
                    </div>
                )}

                {
                    filterState === true ? filteredItems.map((doc) => {
                            return (
                                <DocumentItem
                                    key={doc.id}
                                    docName={doc.docName}
                                    docDate={doc.docDate}
                                    docRate={doc.docRate}
                                    docId={doc.id}
                                    onRemoveDoc={removeDoc}
                                />
                            )
                        }) :
                        documents.length === 0 ? <div></div> : documents.map((doc) => {
                            return (
                                <DocumentItem
                                    key={doc.id}
                                    docName={doc.docName}
                                    docDate={doc.docDate}
                                    docRate={doc.docRate}
                                    docId={doc.id}
                                    onRemoveDoc={removeDoc}
                                />
                            )
                        })
                }
            </div>
            <form className={styles.formWrapper}>
                <div className={styles.inputWrapper}>
                    <input type="text" onChange={handleChangeDocumentName} value={documentName} placeholder='Document Name' className={styles.input}/>
                </div>
                <div>
                    <textarea onChange={handleChangeDocumentBody} value={documentBody} placeholder='Document Body' className={styles.textarea}/>
                </div>
                <button className={styles.btnCreate} onClick={createDoc}>Create</button>
            </form>
        </div>
    );
}

export default Form;