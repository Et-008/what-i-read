import React from "react";
import { getDatabase, ref } from "firebase/database";
import { useList } from "react-firebase-hooks/database";
import styled from "styled-components";

const db = getDatabase();

const BlogCard = styled.div`
  background-color: #ffffff1a;
  margin: 16px auto;
  padding: 16px;
  border: 1px solid #ececec;
  border-radius: 10px;
`;

function BlogData() {
  const blogRef = ref(db, "posts");
  const [snapshots, loading, error] = useList(blogRef);

  return (
    <div>
      {error && <strong>Error: {error}</strong>}
      {loading && <span>Posts: Loading...</span>}
      {!loading && snapshots && (
        <div>
          {snapshots.map((v) => (
            <BlogCard key={v.key}>
              <h4>{v.val().title}</h4>
              <p>{v.val().content}</p>
            </BlogCard>
          ))}
        </div>
      )}
    </div>
  );
}

export { BlogData };
