import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import parseData from "../../helpers/parseData";
import {Rating} from "@mui/material";
import axios from "axios";
import getRandomInt from "../../helpers/getRandomInt";
import styles from './documentPage.module.scss';

function DocumentPage() {
    const [currentDoc, setCurrentDoc] = useState({});
    const [documentBody, setDocumentBody] = useState('');
    const [value, setValue] = useState(2);
    const [imgUrl, setImageUrl] = useState('');
    const docId = useParams().id;

    const handleChangeDocumentBody = (event) => {
        setDocumentBody(event.target.value);
        let docs = JSON.parse(localStorage.getItem('docs'));
        docs = docs.map((doc) => {
            if (+doc.id === +docId) {
                doc.docBody = documentBody;
            }
            return doc;
        })
        localStorage.setItem('docs', JSON.stringify(docs));
    }
    useEffect(() => {
        const docs = JSON.parse(localStorage.getItem('docs'));
        docs.forEach((doc) => {
            if (+doc.id === +docId) {
                setCurrentDoc(doc);
                setDocumentBody(doc.docBody);
                setValue(doc.docRate);
            }
        })
        async function fetchData() {
            const request = await axios.get('https://jsonplaceholder.typicode.com/photos');
            const imgUrl = request.data[getRandomInt(request.data.length)].thumbnailUrl;
            setImageUrl(imgUrl);
        }
        fetchData();
    }, []);

    return (
        <div>
            <Link to='/'>← Main Page</Link>
            <div className={styles.wrapper}>
                <div className={styles.leftCol}>
                    <h1>{currentDoc.docName}</h1>
                    <div>{parseData(currentDoc.docDate)}</div>
                    <div className={styles.ratingWrapper}>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event,  newValue) => {
                                setValue(newValue);
                                let docs = JSON.parse(localStorage.getItem('docs'));
                                docs = docs.map((doc) => {
                                    if (+doc.id === +docId) {
                                        doc.docRate = newValue;
                                    }
                                    return doc;
                                })
                                localStorage.setItem('docs', JSON.stringify(docs));
                            }}
                        />
                    </div>
                    <img src={imgUrl} alt="" className={styles.docImg}/>
                </div>
                <div className={styles.rightCol}>
                    <textarea value={documentBody} onChange={handleChangeDocumentBody} className={styles.textarea}/>
                </div>
            </div>
        </div>
    );
}

export default DocumentPage;
