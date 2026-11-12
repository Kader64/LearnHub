import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AppLayout from "./layout/AppLayout";
import Courses from "./pages/student/Courses";
import CourseDetails from "./pages/student/CourseDetails";
import MyLearning from "./pages/student/MyLearning";
import Lesson from "./pages/student/Lesson";
import Exam from "./pages/student/Exam";
import ExamResult from "./pages/student/ExamResult";
import Certificates from "./pages/student/Certificates";

import TeacherCourses from "./pages/teacher/TeacherCourses";
import CourseEditor from "./pages/teacher/CourseEditor";
import LessonEditor from "./pages/teacher/LessonEditor";
import ExamEditor from "./pages/teacher/ExamEditor";

import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminCertificates from "./pages/admin/AdminCertificates";
import Categories from "./pages/admin/Categories";
import AuditLog from "./pages/admin/AuditLog";
import Verify from "./pages/Verify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/verify/:code" element={<Verify />} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/learn/:courseId" element={<Lesson />} />
          <Route path="/exam/:courseId" element={<Exam />} />
          <Route path="/exam/:courseId/result" element={<ExamResult />} />
          <Route path="/certificates" element={<Certificates />} />

          <Route path="/teach/courses" element={<TeacherCourses />} />
          <Route path="/teach/courses/new" element={<CourseEditor />} />
          <Route path="/teach/courses/:id" element={<CourseEditor />} />
          <Route path="/teach/courses/:id/lessons/:lessonId" element={<LessonEditor />} />
          <Route path="/teach/courses/:id/exam" element={<ExamEditor />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="certificates" element={<AdminCertificates />} />
          <Route path="categories" element={<Categories />} />
          <Route path="audit" element={<AuditLog />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
