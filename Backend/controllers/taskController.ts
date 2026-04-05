import { Response } from "express";
import prisma from "../prismaClient";
import { AuthRequest } from "../middleware/authMiddleware";

//  Create Task
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.userId!,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

//  Get Tasks (with pagination + filter + search)
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { page = "1", limit = "5", status, search } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    
 if (pageNumber < 1 || limitNumber < 1) {
  return res.status(400).json({ message: "Invalid pagination values" });
}

    const filters: any = {
      userId: req.userId,
    };

    //  Status filter
    if (status !== undefined) {
      filters.status = status === "true";
    }

    //  Search filter (case-insensitive)
    if (search) {
     if (search) {
  filters.title = {
    contains: String(search),
  };
}
    }

    //  Get total count
    const total = await prisma.task.count({
      where: filters,
    });

    //  Get paginated data
    const tasks = await prisma.task.findMany({
      where: filters,
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalPages = Math.ceil(total / limitNumber);


    res.status(200).json({
      success: true,
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages,
      data: tasks,
    });
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching tasks",
    });
  }
};

//  Update Task
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: req.body,
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

//  Delete Task
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

// Toggle Status
export const toggleTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    const updated = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        status: !task?.status,
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error toggling task" });
  }
};