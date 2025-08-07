<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-item">
        <GithubIcon />

        <a href="https://github.com/evgeniyGusev" class="link" target="_blank" rel="noopener noreferrer">
          github.com/evgeniyGusev
        </a>
      </div>

      <div class="footer-item footer-item__padded">
        <EmailWhiteIcon />

        <a
          href="mailto:shchelkalinevgeniy@gmail.com"
          class="link link__email"
          target="_blank"
          rel="noopener noreferrer"
        >
          shchelkalinevgeniy@gmail.com
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import GithubIcon from '@/assets/icons/github.svg?component';
import EmailWhiteIcon from '@/assets/icons/email-white.svg?component';
</script>

<style scoped>
.footer {
  background-color: #111;
  color: #ccc;
  padding: 1rem;
  font-size: 0.9rem;
  border-top: 1px solid #333;
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
}

.footer-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.footer-item__padded {
  padding-left: 0.5rem;
}

.label {
  font-weight: 600;
  color: #eee;
}

.link {
  color: #aaa;
  text-decoration: none;
  transition: color 0.2s ease;
}

.link__email {
  margin-left: 0.25rem;
}

.link:hover {
  color: #fff;
}
</style>
