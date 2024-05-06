import React from "react";
import { Select } from "antd";

const Tags = ({ tags, setTags }) => {
  const options = [
    // Frontend
    "React",
    "Angular",
    "Vue.js",
    "Svelte",
    "Ember.js",
    "Polymer",
    "Backbone.js",
    "Bootstrap",
    "Foundation",
    "Bulma",
    "Tailwind CSS",
    "Semantic UI",

    // Backend
    "Node.js",
    "Django",
    "Flask ",
    "Ruby on Rails",
    "Laravel ",
    "Express.js",
    "Spring Boot",
    "ASP.NET",
    "Express",
    "Flask",

    // Database
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "SQLite",
    "Redis",
    "Firebase",
    "Cassandra",
    "Couchbase",
    "Neo4j",
    "MariaDB",

    // Other Tools and Libraries
    "Webpack",
    "Babel",
    "ESLint",
    "Prettier",
    "Cypress",
    "Selenium",
    "Jest",
    "Mocha",
    "Chai",
    "Puppeteer",

    // Testing
    "Karma",
    "Jasmine",
    "Protractor",
    "TestCafe",
    "JUnit",
    "NUnit",
    "Pytest",
    "Robot Framework",
    "RSpec",
    "Cucumber",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "CircleCI",
    "Travis CI",
    "GitLab CI",
    "GitHub Actions",
    "AWS CodePipeline",
    "Azure DevOps",
    "Google Cloud Build",
  ].map((option) => ({ value: option, label: option }));

  const handleChange = (value) => {
    setTags(value)
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <Select
        mode="tags"
        style={{
          width: "100%",
        }}
        placeholder="Tags Mode"
        onChange={handleChange}
        options={options}
      />
    </div>
  );
};

export default Tags;
