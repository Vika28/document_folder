import styles from './DocumentItem.module.scss';
import removeImg from './../../images/remove.png'
import editImg from './../../images/edit.png'
import {Link} from "react-router-dom";
import parseData from "../../helpers/parseData";
import {Rating} from "@mui/material";

function DocumentItem(props) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.docName}>{props.docName}</div>
            <div className={styles.docDate}>{parseData(props.docDate)}</div>
            <div className={styles.docRate}>
                <div>
                    <Rating name="read-only" value={props.docRate} readOnly />
                </div>
            </div>
            <div className={styles.btnsWrapper}>
                <Link to={`${props.docId}`}>
                    <button className={styles.editBtn}><img src={editImg} className={styles.editImg} alt=""/></button>
                </Link>

                <button className={styles.removeBtn}>
                    <img src={removeImg}
                         className={styles.removeImg}
                         alt=""
                         onClick={() => props.onRemoveDoc(props.docId)}/>
                </button>
            </div>
        </div>
    );
}

export default DocumentItem;