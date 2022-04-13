// importamos la funcion que vamos a testear
import {
  deletePost,
  savePost,
  editPost,
  likePost,
} from "../src/lib/firestore.js";
jest.mock("../src/lib/firebase-imports.js");

describe("savePost", () => {
  it("should be a function", () => {
    expect(typeof savePost).toBe("function");
  });

  it("should save all data of post", () => {
    console.log(savePost);

    // expect(savePost(post, date)).toBe(undefined)
  });
  // const post = [{ name: "Bob" }];
  // const resp = { data: post };
  // axios.get.mockResolvedValue(resp);
});

describe("deletePost", () => {
  it("should be a function", () => {
    expect(typeof deletePost).toBe("function");
  });

  it("should delete post", () => {
    let id = "123456";
    expect(deletePost(id)).toBe(undefined);
  });
});

describe("editPost", () => {
  it("should be a function", () => {
    expect(typeof editPost).toBe("function");
  });

  it("should delte the post...", () => {});
});

describe("likePost", () => {
  it("should be a function", () => {
    expect(typeof likePost).toBe("function");
  });

  it("should s...", () => {});
});

