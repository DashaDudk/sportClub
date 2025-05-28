<template>
  <div class="page-wrapper fade-in">
    <h1 class="hero-heading">
      Спорт — це не просто гра, це спосіб життя, який вчить нас бути сильними, цілеспрямованими та витривалими.
    </h1>
    <p class="subtext">
      Отримайте фігуру своєї мрії разом з нашим спортивним клубом. Наші висококваліфіковані тренери з великим досвідом допоможуть вам досягти ваших цілей у фітнесі та спорті.
    </p>
  </div>
</template>

<style scoped>
.page-wrapper {
  padding: 10px 40px;
  max-width: 1150px; 
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #333333;
  font-family: 'Montserrat Alternates', serif;
}

.hero-heading {
  font-family: 'Montserrat Alternates', bold;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.7;
  margin-bottom: 1.4rem;
  color: #3b5b65;
  max-width: 85%;
}

.subtext {
  font-size: 1.15rem;
  line-height: 1.65;
  color: #555555;
  max-width: 80%;
  opacity: 0.9;
  margin: 0 auto;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeInUp 1.2s ease-out forwards;
}
</style>
