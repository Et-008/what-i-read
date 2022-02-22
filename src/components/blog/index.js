import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../App";

import { addUserBlog } from "../../containers/database";
import { PrimaryButton } from "../buttons";
import { BlogData } from "./blog";

const BlogContainer = styled.div`
  background: #323232;
  border-radius: 25px;
  border: 1px solid #1b262c;
  padding: 40px 24px 16px;
  display: grid;

  textarea,
  input {
    width: 100%;
  }
`;

const Textarea = styled.textarea`
  outline: none;
  padding: 10px 20px;
  margin: 10px auto;
  border: 1px solid #ececec;
  border-radius: 10px;
  background: transparent;
  color: inherit;
`;

const Input = styled.input`
  outline: none;
  padding: 10px 20px;
  margin: 10px auto;
  border: 1px solid #ececec;
  border-radius: 10px;
  background: transparent;
  color: inherit;
`;

const Blog = (props) => {
  const userData = useContext(UserContext);
  const [blogData, setBlogData] = useState({ title: "", content: "" });

  function handleInput(e) {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  }

  function handleSubmit() {
    setBlogData({ title: "", content: "" });
    addUserBlog({
      ...blogData,
      ownerId: userData.uid,
      createdAt: Date.now(),
      authorName: userData.displayName,
    });
  }

  return (
    <BlogContainer>
      <div>
        <h3>Posts</h3>
        {BlogData()}
      </div>
      <br />
      <br />
      <Input
        type={"text"}
        placeholder="title"
        name="title"
        value={blogData.title}
        onChange={handleInput}
      />
      <Textarea
        onChange={handleInput}
        value={blogData.content}
        name="content"
        placeholder="content"
      />
      <div>
        <PrimaryButton
          onClick={handleSubmit}
          text="Create"
          background="#cdb4db"
        />
      </div>
    </BlogContainer>
  );
};

export default Blog;
