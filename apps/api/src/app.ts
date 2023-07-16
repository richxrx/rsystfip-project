import express from "express";
import morgan from "morgan";
import path from "path";
import { PORT } from "./config";
import authMiddleware from "./middlewares/auth.middleware";
import roleMiddleware from "./middlewares/role.middleware";
import accountRoutes from "./routes/account.routes";
import authRoutes from "./routes/auth.routes";
import cancellationRoutes from "./routes/cancellation.routes";
import deanRoutes from "./routes/dean.routes";
import peopleRoutes from "./routes/people.routes";
import reportRoutes from "./routes/report.routes";
import resourceRoutes from "./routes/resource.routes";
import scheduleRoutes from "./routes/schedule.routes";
import sessionRoutes from "./routes/session.routes";
import statisticRoutes from "./routes/statistic.routes";
import userRoutes from "./routes/user.routes";

export class App {
  private app: express.Application;

  constructor(private port: number) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.app.set("port", this.port || PORT || 3000);
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(
      express.static(path.join(__dirname, "..", "..", "frontend", "dist"))
    );
  }

  routes() {
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/session", sessionRoutes);
    this.app.use("/api/account", accountRoutes);
    this.app.use("/api/users", authMiddleware(), userRoutes);
    this.app.use(
      "/api/people",
      authMiddleware(),
      roleMiddleware("admin", "secretaria", "rector"),
      peopleRoutes
    );
    this.app.use(
      "/api/schedule",
      authMiddleware(),
      roleMiddleware("admin", "secretaria", "rector"),
      scheduleRoutes
    );
    this.app.use(
      "/api/cancellation",
      authMiddleware(),
      roleMiddleware("admin", "secretaria", "rector"),
      cancellationRoutes
    );
    this.app.use(
      "/api/resource",
      authMiddleware(),
      roleMiddleware("admin", "secretaria", "rector"),
      resourceRoutes
    );
    this.app.use(
      "/api/deans",
      authMiddleware(),
      roleMiddleware("admin", "secretaria", "rector"),
      deanRoutes
    );
    this.app.use(
      "/api/reports",
      authMiddleware(),
      roleMiddleware("admin", "secretaria"),
      reportRoutes
    );
    this.app.use(
      "/api/statistics",
      authMiddleware(),
      roleMiddleware("admin", "secretaria"),
      statisticRoutes
    );
  }

  listen() {
    this.app.listen(this.app.get("port"));
    console.info("Server running on port", this.app.get("port"));
  }
}
