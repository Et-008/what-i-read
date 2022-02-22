import React, { useContext } from "react";
import { getDatabase, ref, remove } from "firebase/database";
import { useList } from "react-firebase-hooks/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { UserContext } from "../../App";

const db = getDatabase();

const BlogCard = styled.div`
  background-color: #ffffff1a;
  margin: 16px auto;
  padding: 16px;
  border: 1px solid #ececec;
  border-radius: 10px;
  position: relative;

  .fa-trash {
    position: absolute;
    right: 16px;
    top: 16px;
    display: none;
    cursor: pointer;
  }

  .fa-pen {
    position: absolute;
    right: 48px;
    top: 16px;
    display: none;
    cursor: pointer;
  }

  &:hover {
    .fa-trash,
    .fa-pen {
      display: block;
    }
  }
`;

function BlogData() {
  const userData = useContext(UserContext);
  const blogRef = ref(db, "posts");
  const [snapshots, loading, error] = useList(blogRef);

  return (
    <div>
      {error && <strong>Error: {error}</strong>}
      {loading && <span>Posts: Loading...</span>}
      {!loading && snapshots && (
        <div>
          {snapshots.map((v) => {
            let date = new Date(v.val().createdAt).toLocaleString();
            return (
              <BlogCard key={v.key}>
                <h4>{v.val().title}</h4>
                {userData.uid === v.val().ownerId && (
                  <>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => remove(v.ref)}
                    />
                    <FontAwesomeIcon icon={faPen} onClick={() => {}} />
                  </>
                )}
                <p>{v.val().content}</p>
                <div>
                  <p>{date}</p><p>{v.val().authorName}</p>
                </div>
              </BlogCard>
            );
          })}
        </div>
      )}
    </div>
  );
}

export { BlogData };
