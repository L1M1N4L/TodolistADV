import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase'; // Import the db from your firebase config
import { auth } from '../firebase/firebase'; // Add this import at the top
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import for navigation

function JettolatteApp() {
  // Navigation hook for redirect
  const navigate = useNavigate();
  
  // State for tasks
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium', status: 'pending' });
  const [editingTask, setEditingTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Reference to the tasks collection
  const tasksCollectionRef = collection(db, "tasks");

  // Fetch tasks from Firestore on component mount
  useEffect(() => {
    // Create an auth state observer
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in - fetch their tasks
        try {
          setLoading(true);
          
          // Query only tasks belonging to current user
          const q = query(
            tasksCollectionRef, 
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
          );
          
          const querySnapshot = await getDocs(q);
          
          const tasksData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString()
          }));
          
          // Set tasks - this will show YOUR tasks when you're signed in
          setTasks(tasksData);
        } catch (error) {
          console.error("Error fetching tasks: ", error);
        } finally {
          setLoading(false);
        }
      } else {
        // User is signed out - clear tasks for security
        // This only happens when you log out, not when you log in
        setTasks([]);
        setLoading(false);
      }
    });
    
    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  // Handle logout and redirect to landing page
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        // Redirect to landing page after successful logout
        navigate('');
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
        // You might want to show an error notification here
      });
  };

  // When creating a task, add the user's ID
const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    
    try {
      // Get current user ID
      const userId = auth.currentUser.uid;
      
      const taskData = {
        title: newTask.title,
        priority: newTask.priority,
        status: newTask.status,
        createdAt: new Date(),
        userId: userId // Add the user ID to the task
      };
      
      // Add document to Firestore
      const docRef = await addDoc(tasksCollectionRef, taskData);
      
      // Add to local state with the Firestore document ID
      const newTaskWithId = {
        ...taskData,
        id: docRef.id,
        createdAt: taskData.createdAt.toISOString()
      };
      
      setTasks([newTaskWithId, ...tasks]);
      setNewTask({ title: '', priority: 'medium', status: 'pending' });
    } catch (error) {
      console.error("Error adding task: ", error);
      // Handle error (e.g., show a notification)
    }
  };

  // Edit task
  const handleEditClick = (task) => {
    setEditingTask({
      ...task,
      createdAt: task.createdAt || new Date().toISOString()
    });
    setIsEditing(true);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    
    try {
      const taskDocRef = doc(db, "tasks", editingTask.id);
      
      // Update the task in Firestore (exclude id from the data)
      const { id, createdAt, ...taskData } = editingTask;
      
      // Convert createdAt back to a Firestore timestamp if needed
      if (typeof createdAt === 'string') {
        taskData.createdAt = new Date(createdAt);
      }
      
      await updateDoc(taskDocRef, taskData);
      
      // Update the task in the local state
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...editingTask, createdAt: typeof createdAt === 'string' ? createdAt : new Date().toISOString() } 
          : task
      ));
      
      setIsEditing(false);
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task: ", error);
      // Handle error (e.g., show a notification)
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        // Delete the task from Firestore
        const taskDocRef = doc(db, "tasks", id);
        await deleteDoc(taskDocRef);
        
        // Remove the task from the local state
        setTasks(tasks.filter(task => task.id !== id));
      } catch (error) {
        console.error("Error deleting task: ", error);
        // Handle error (e.g., show a notification)
      }
    }
  };

  // Toggle task status
  const handleToggleStatus = async (id) => {
    try {
      // Find the task to toggle
      const taskToToggle = tasks.find(task => task.id === id);
      if (!taskToToggle) return;
      
      // New status is the opposite of the current status
      const newStatus = taskToToggle.status === 'completed' ? 'pending' : 'completed';
      
      // Update the task in Firestore
      const taskDocRef = doc(db, "tasks", id);
      await updateDoc(taskDocRef, { status: newStatus });
      
      // Update the task in the local state
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, status: newStatus } : task
      ));
    } catch (error) {
      console.error("Error toggling task status: ", error);
      // Handle error (e.g., show a notification)
    }
  };

  // Filter tasks based on search term and filter
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || task.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-950 font-sans text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 py-4 px-6 shadow-lg shadow-purple-900/20">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300 ml-2">Jettolatte</div>
            </div>
            
            {/* Logout Button */}
            <div className="flex items-center">
              <div className="text-sm text-gray-400 mr-4">Your Task Café</div>
              <button 
                onClick={handleLogout}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 border border-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 flex-grow">
        <div className="grid md:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="md:col-span-3">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-lg shadow-purple-900/10">
              <h2 className="text-xl font-bold text-white mb-4">Dashboard</h2>
              <nav>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => setFilter('all')}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${filter === 'all' ? 'bg-purple-900/50 text-purple-300' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                      All Tasks
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setFilter('pending')}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${filter === 'pending' ? 'bg-purple-900/50 text-purple-300' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                      Pending
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setFilter('completed')}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${filter === 'completed' ? 'bg-purple-900/50 text-purple-300' : 'text-gray-300 hover:bg-gray-800'}`}
                    >
                      Completed
                    </button>
                  </li>
                </ul>
              </nav>

              <div className="mt-8">
                <h3 className="text-md font-bold text-white mb-2">Task Statistics</h3>
                <div className="space-y-2">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="text-gray-400 text-sm">Total Tasks</div>
                    <div className="text-xl font-bold text-white">{tasks.length}</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="text-gray-400 text-sm">Completed</div>
                    <div className="text-xl font-bold text-green-400">
                      {tasks.filter(task => task.status === 'completed').length}
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="text-gray-400 text-sm">Pending</div>
                    <div className="text-xl font-bold text-amber-400">
                      {tasks.filter(task => task.status === 'pending').length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Task Area */}
          <div className="md:col-span-9">
            {/* Task Creation/Edit Form */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-lg shadow-purple-900/10 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">
                {isEditing ? 'Edit Task' : 'Create New Task'}
              </h2>
              
              <form onSubmit={isEditing ? handleUpdateTask : handleCreateTask}>
                <div className="mb-4">
                  <label htmlFor="taskTitle" className="block text-gray-400 mb-2">Task Title</label>
                  <input
                    id="taskTitle"
                    type="text"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="What needs to be done?"
                    value={isEditing ? editingTask.title : newTask.title}
                    onChange={(e) => isEditing 
                      ? setEditingTask({...editingTask, title: e.target.value})
                      : setNewTask({...newTask, title: e.target.value})
                    }
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="taskPriority" className="block text-gray-400 mb-2">Priority</label>
                    <select
                      id="taskPriority"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      value={isEditing ? editingTask.priority : newTask.priority}
                      onChange={(e) => isEditing 
                        ? setEditingTask({...editingTask, priority: e.target.value})
                        : setNewTask({...newTask, priority: e.target.value})
                      }
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="taskStatus" className="block text-gray-400 mb-2">Status</label>
                    <select
                      id="taskStatus"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      value={isEditing ? editingTask.status : newTask.status}
                      onChange={(e) => isEditing 
                        ? setEditingTask({...editingTask, status: e.target.value})
                        : setNewTask({...newTask, status: e.target.value})
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  {isEditing && (
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                      onClick={() => {
                        setIsEditing(false);
                        setEditingTask(null);
                      }}
                    >
                      Cancel
                    </button>
                  )}
                  
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-500 hover:to-indigo-500 transition-all shadow-md shadow-purple-900/40"
                  >
                    {isEditing ? 'Update Task' : 'Add Task'}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Task List */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-lg shadow-purple-900/10">
              <div className="p-6 border-b border-gray-800">
                <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
                  <h2 className="text-xl font-bold text-white">Task List</h2>
                  
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {loading ? (
                  <div className="text-center py-6">
                    <div className="inline-block w-8 h-8 border-4 border-gray-400 border-t-purple-500 rounded-full animate-spin"></div>
                    <p className="mt-2 text-gray-400">Loading tasks...</p>
                  </div>
                ) : filteredTasks.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-400">No tasks found. Create a new task to get started!</p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {filteredTasks.map((task) => (
                      <li key={task.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 group hover:border-purple-700/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <button 
                              onClick={() => handleToggleStatus(task.id)}
                              className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border ${
                                task.status === 'completed' 
                                  ? 'border-green-500 bg-green-500/20 text-green-500' 
                                  : 'border-gray-600 bg-gray-700/50'
                              }`}
                            >
                              {task.status === 'completed' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                            
                            <div>
                              <h3 className={`font-medium ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-white'}`}>
                                {task.title}
                              </h3>
                              <div className="flex items-center mt-1 space-x-2">
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  task.priority === 'high' 
                                    ? 'bg-red-900/40 text-red-400' 
                                    : task.priority === 'medium' 
                                      ? 'bg-amber-900/40 text-amber-400' 
                                      : 'bg-blue-900/40 text-blue-400'
                                }`}>
                                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'No date'}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleEditClick(task)}
                              className="text-gray-400 hover:text-indigo-400 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            
                            <button 
                              onClick={() => handleDeleteTask(task.id)}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Improved Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-auto">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">Jettolatte</div>
              </div>
              <p className="text-gray-400 text-sm">Organize your tasks efficiently with our beautiful and intuitive task management application.</p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-3">Stay Connected</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
              <p className="mt-4 text-gray-500 text-sm">
                © {new Date().getFullYear()} Jettolatte. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default JettolatteApp;