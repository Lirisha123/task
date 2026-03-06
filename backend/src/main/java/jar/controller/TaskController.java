package jar.controller;

import jar.model.Task;
import jar.security.JwtUtil;
import jar.service.TaskService;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final JwtUtil jwtUtil;

    public TaskController(TaskService taskService, JwtUtil jwtUtil) {
        this.taskService = taskService;
        this.jwtUtil = jwtUtil;
    }

    private String extractEmailFromAuth(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }
        String token = authHeader.substring(7);
        return jwtUtil.extractEmail(token);
    }

    // CREATE
    @PostMapping
    public Task createTask(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader,
            @RequestBody Task task
    ) {
        String email = extractEmailFromAuth(authHeader);
        return taskService.createTask(task, email);
    }

    // READ ALL
    @GetMapping
    public List<Task> getAllTasks(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        String email = extractEmailFromAuth(authHeader);
        return taskService.getAllTasks(email);
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Task getTaskById(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader,
            @PathVariable Long id
    ) {
        String email = extractEmailFromAuth(authHeader);
        return taskService.getTaskById(id, email);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Task updateTask(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader,
            @PathVariable Long id,
            @RequestBody Task task
    ) {
        String email = extractEmailFromAuth(authHeader);
        return taskService.updateTask(id, task, email);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteTask(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader,
            @PathVariable Long id
    ) {
        String email = extractEmailFromAuth(authHeader);
        taskService.deleteTask(id, email);
        return "Task deleted successfully";
    }
}
