document.addEventListener('DOMContentLoaded', function () {
    let content = document.getElementById('projects');
    var addButton = document.getElementById('AddButton');
    var projectInput = document.getElementById('project');
    var filterOptions = document.getElementsByName('filter');

    // Load projects from localStorage
    var projects = JSON.parse(localStorage.getItem('projects')) || [];

    function saveProjects() {
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    function renderProjects() {
        content.innerHTML = '';

        projects.forEach(function (project) {
            var newProject = document.createElement('div');
            newProject.className = 'project-item';

            var projectText = document.createElement('p');
            projectText.textContent = project.name;
            projectText.classList.toggle('completed', project.completed);
            newProject.appendChild(projectText);

            var deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () {
                projects = projects.filter(p => p !== project);
                saveProjects();
                renderProjects();
            });

            var completeCheckbox = document.createElement('input');
            completeCheckbox.type = 'checkbox';
            completeCheckbox.id = 'checkbox';
            completeCheckbox.checked = project.completed;
            completeCheckbox.addEventListener('change', function () {
                project.completed = completeCheckbox.checked;
                saveProjects();
                renderProjects();
            });

            newProject.appendChild(completeCheckbox);
            newProject.appendChild(deleteButton);
            content.appendChild(newProject);
        });
    }

    renderProjects();

    addButton.addEventListener('click', function () {
        var inputValue = projectInput.value.trim();
        if (inputValue !== '') {
            projects.push({ name: inputValue, completed: false });
            saveProjects();
            renderProjects();
            projectInput.value = '';
        }
    });

    // Function to filter projects based on radio button selection
    function filterProjects() {
        var filterValue = Array.from(filterOptions).find(opt => opt.checked).value;

        renderProjects();
        if (filterValue !== 'all') {
            projects = projects.filter(project => {
                return (filterValue === 'active' && !project.completed) ||
                    (filterValue === 'completed' && project.completed);
            });
            renderProjects();
        }
    }

    // Add event listener for radio button changes
    filterOptions.forEach(opt => opt.addEventListener('change', filterProjects));
});
document.addEventListener('DOMContentLoaded', function () {
    let content = document.getElementById('projects');
    var addButton = document.getElementById('AddButton');
    var projectInput = document.getElementById('project');
    var filterOptions = document.getElementsByName('filter');
    var daySelector = document.getElementById('daySelector');

    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var currentDay = days[0];
    populateDaySelector();

    function populateDaySelector() {
        days.forEach(function (day) {
            var option = document.createElement('option');
            option.value = day;
            option.textContent = day;
            daySelector.appendChild(option);
        });
    }

    daySelector.addEventListener('change', function () {
        currentDay = daySelector.value;
        renderProjects();
    });

    // Load projects from localStorage
    var projects = JSON.parse(localStorage.getItem('projects')) || {};

    function saveProjects() {
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    function renderProjects() {
        content.innerHTML = '';

        if (!projects[currentDay]) {
            projects[currentDay] = [];
        }

        projects[currentDay].forEach(function (project) {
            var newProject = document.createElement('div');
            newProject.className = 'project-item';

            var projectText = document.createElement('p');
            projectText.textContent = project.name;
            projectText.classList.toggle('completed', project.completed);
            newProject.appendChild(projectText);

            var deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () {
                projects[currentDay] = projects[currentDay].filter(p => p !== project);
                saveProjects();
                renderProjects();
            });

            var completeCheckbox = document.createElement('input');
            completeCheckbox.type = 'checkbox';
            completeCheckbox.id = 'checkbox';
            completeCheckbox.checked = project.completed;
            completeCheckbox.addEventListener('change', function () {
                project.completed = completeCheckbox.checked;
                saveProjects();
                renderProjects();
            });

            newProject.appendChild(completeCheckbox);
            newProject.appendChild(deleteButton);
            content.appendChild(newProject);
        });
    }

    renderProjects();

    addButton.addEventListener('click', function () {
        var inputValue = projectInput.value.trim();
        if (inputValue !== '') {
            if (!projects[currentDay]) {
                projects[currentDay] = [];
            }

            projects[currentDay].push({ name: inputValue, completed: false });
            saveProjects();
            renderProjects();
            projectInput.value = '';
        }
    });

    // Function to filter projects based on radio button selection
    function filterProjects() {
        var filterValue = Array.from(filterOptions).find(opt => opt.checked).value;

        renderProjects();
        if (filterValue !== 'all') {
            projects[currentDay] = projects[currentDay].filter(project => {
                return (filterValue === 'active' && !project.completed) ||
                    (filterValue === 'completed' && project.completed);
            });
            renderProjects();
        }
    }

    // Add event listener for radio button changes
    filterOptions.forEach(opt => opt.addEventListener('change', filterProjects));
});
