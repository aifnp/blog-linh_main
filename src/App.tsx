import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LayoutCommon from "./layout/LayoutCommon";
import TextSummarizer from "./TextSummarizer"; // Import trực tiếp

// Lazy load the components
const HomePage = lazy(() => import("./pages/HomePage"));
const CategoryDetail = lazy(() => import("./pages/CategoryDetail"));
const PostDetail = lazy(() => import("./pages/PostDetail"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          loading
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<LayoutCommon />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/:slug" element={<CategoryDetail />} />
          <Route path="/post" element={<PostDetail />} />
          <Route path="/text-summarizer" element={<TextSummarizer />} />
        </Route>
      </Routes>
      <TextSummarizer /> {/* Hiển thị trực tiếp */}
    </Suspense>
  );
}

export default App;
