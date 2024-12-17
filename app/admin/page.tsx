import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUsers } from "./users/actions";
import { getBlogs } from "./blogs/actions";
import { getReports } from "../submit-report/actions";
import { getQuestions } from "./questions/actions";
import { StatCard } from "@/components/StatCard";
import { UserChart } from "@/components/UserChart";
import { ReportChart } from "@/components/ReportChart";
import { BlogChart } from "@/components/BlogChart";

export default async function AdminDashboard() {
  const [users, blogs, reports, questions] = await Promise.all([
    getUsers(),
    getBlogs(),
    getReports(),
    getQuestions(),
  ]);

  const userCount = users.length;
  const blogCount = blogs.length;
  const reportCount = reports.length;
  const questionCount = questions.length;

  const recentUsers = users.slice(0, 5);
  const recentReports = reports.slice(0, 5);
  const recentBlogs = blogs.slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value={userCount} />
        <StatCard title="Total Blogs" value={blogCount} />
        <StatCard title="Total Reports" value={reportCount} />
        <StatCard title="Total Questions" value={questionCount} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <UserChart data={users?.map((e) => {
              return { id: BigInt(e.id), createdAt: e.createdAt }
            })} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recentUsers.map((user) => (
                <li key={user.id.toString()} className="text-sm">
                  {user.firstName} {user.lastName} - {user.email}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Report Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <ReportChart data={reports.map(report => ({ id: BigInt(report.user.id), createdAt: report.createdAt }))} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recentReports.map((report) => (
                <li key={report.id.toString()} className="text-sm">
                  {report.user.firstName} {report.user.lastName} -{" "}
                  {new Date(report.createdAt).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Blog Publications</CardTitle>
          </CardHeader>
          <CardContent>
            <BlogChart data={blogs.map(blog => ({ id: BigInt(blog.id), createdAt: blog.createdAt.toISOString() }))} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recentBlogs.map((blog) => (
                <li key={blog.id.toString()} className="text-sm">
                  {blog.title} - {blog.author.firstName} {blog.author.lastName}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
