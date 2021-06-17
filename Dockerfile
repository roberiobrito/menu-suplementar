# production stage
FROM nginx:1.13.12-alpine

# COPY --from=0 /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

COPY dist /usr/share/nginx/html/
COPY iniciar-nginx.sh config/ambientes /usr/app/

#definir em tempo de execução para selecionar ambiente
ENV AMBIENTE=dev

WORKDIR /usr/app
CMD ["sh", "-c", "/usr/app/iniciar-nginx.sh /usr/share/nginx/html"]
RUN chmod a+x *.sh
