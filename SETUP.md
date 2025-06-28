# HostelDorm - MySQL Database Setup Guide

This guide will help you connect your hostel management system with MySQL database.

## Prerequisites

1. **XAMPP/WAMP/MAMP** (or any local server with PHP and MySQL)
2. **MySQL Server** running
3. **PHP** (version 7.4 or higher recommended)

## Step 1: Database Setup

### Option A: Using phpMyAdmin (Recommended)

1. Open your browser and go to `http://localhost/phpmyadmin`
2. Click on "New" to create a new database
3. Enter database name: `hosteldorm_db`
4. Click "Create"
5. Select the `hosteldorm_db` database
6. Click on "Import" tab
7. Choose the file `database/setup.sql`
8. Click "Go" to execute the SQL

### Option B: Using MySQL Command Line

```bash
mysql -u root -p
```

Then run:
```sql
source database/setup.sql;
```

## Step 2: Configure Database Connection

1. Open `config/database.php`
2. Update the database credentials:

```php
define('DB_HOST', 'localhost');     // Your MySQL host
define('DB_USER', 'root');          // Your MySQL username
define('DB_PASS', '');              // Your MySQL password
define('DB_NAME', 'hosteldorm_db'); // Database name
```

## Step 3: File Structure

Ensure your project structure looks like this:

```
HostelDorm/
├── index.html              # Login page
├── dashboard.html          # Main dashboard
├── registration.html       # Registration page
├── new-student.html        # New student page
├── manage-rooms.html       # Manage rooms page
├── update-student-list.html # Update students page
├── delete-student-list.html # Delete students page
├── styles.css              # Main CSS file
├── script.js               # Login JavaScript
├── registration.js         # Registration JavaScript
├── new-student.js          # New student JavaScript
├── manage-rooms.js         # Manage rooms JavaScript
├── update-student-list.js  # Update students JavaScript
├── delete-student-list.js  # Delete students JavaScript
├── config/
│   └── database.php        # Database configuration
├── api/
│   ├── login.php           # Login API
│   └── register.php        # Registration API
└── database/
    └── setup.sql           # Database schema
```

## Step 4: Start Your Local Server

1. Start XAMPP/WAMP/MAMP
2. Start Apache and MySQL services
3. Place your project in the `htdocs` folder (XAMPP) or `www` folder (WAMP)
4. Access your project: `http://localhost/HostelDorm`

## Step 5: Test the System

### Default Admin Account
- **Username:** admin
- **Password:** admin123

### Test Registration
1. Go to `http://localhost/HostelDorm/registration.html`
2. Fill out the registration form
3. Submit and check if data is saved in the database

### Test Login
1. Go to `http://localhost/HostelDorm/`
2. Use the admin credentials or register a new account
3. Login and verify redirection to dashboard

## Database Tables

### Users Table
- Stores user registration and login information
- Includes: id, username, password (hashed), email, full_name, phone, gender, date_of_birth, address, room_preference

### Students Table
- Stores student information
- Includes: id, name, email, phone, gender, date_of_birth, address, room_assignment, admission_date, guardian_name, guardian_contact

### Rooms Table
- Stores room information
- Includes: id, room_number, room_type, capacity, status

## Troubleshooting

### Common Issues:

1. **Connection Failed**
   - Check if MySQL is running
   - Verify database credentials in `config/database.php`
   - Ensure database `hosteldorm_db` exists

2. **404 Error on API calls**
   - Check file paths in JavaScript files
   - Ensure API files are in the correct location
   - Verify server is running

3. **Permission Denied**
   - Check file permissions
   - Ensure PHP has write access to session directory

4. **CORS Issues**
   - API files include CORS headers
   - If issues persist, check browser console for errors

### Debug Mode

To enable debug mode, add this to `config/database.php`:

```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

## Security Notes

1. **Change default passwords** in production
2. **Use HTTPS** in production
3. **Implement proper session management**
4. **Add input validation** on server-side
5. **Use prepared statements** (already implemented)
6. **Hash passwords** (already implemented)

## Next Steps

1. **Add more API endpoints** for other features (students, rooms)
2. **Implement session management** across pages
3. **Add user roles and permissions**
4. **Implement data export/import features**
5. **Add reporting and analytics**

## Support

If you encounter issues:
1. Check browser console for JavaScript errors
2. Check server error logs
3. Verify database connection
4. Test API endpoints directly

For more help, check the browser's Network tab to see API requests and responses. 